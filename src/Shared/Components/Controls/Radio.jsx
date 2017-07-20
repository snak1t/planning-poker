import React from 'react'
import styled from 'styled-components'
import { Label } from './Label'
import prop from 'ramda/src/prop'
import omit from 'ramda/src/omit'
import merge from 'ramda/src/merge'

const Row = styled.div`padding: 4px;`

const Span = styled.span`padding-left: 10px;`

export const RadioButton = props => {
  const value = prop('value', props)
  const correctProps = merge({ defaultValue: value }, omit(['value'], props))
  return <input type="radio" {...correctProps} />
}

export class RadioGroup extends React.Component {
  renderChildren() {
    return React.Children.map(this.props.children, (child, id) => {
      return (
        <Row>
          <Label>
            {React.cloneElement(child, {
              name: this.props.name,
              onChange: this.props.onChange
            })}
            <Span>
              {child.props.label}
            </Span>
          </Label>
        </Row>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    )
  }
}
