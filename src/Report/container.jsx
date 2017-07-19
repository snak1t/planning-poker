import React from 'react'
import { Button } from '../Controls/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Report } from './component'
import { evolve, not } from 'ramda'

const switchShowReport = evolve({ showReport: not })

export class ReportContainer extends React.Component {
  state = {
    showReport: false
  }

  prepareReport = () => this.setState(switchShowReport)

  closeReport = () => this.setState(switchShowReport)

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button outline onClick={this.prepareReport}>
          Show Report
        </Button>
        {this.state.showReport
          ? <Report
              game={this.props.game}
              stories={this.props.stories}
              onClose={this.closeReport}
            />
          : null}
      </div>
    )
  }
}

const mapStateToProp = (state, props) => ({
  game: state.games.find(g => g._id === props.match.params.gameID),
  stories: state.stories.all
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProp, mapDispatchToProps)(ReportContainer)
)
