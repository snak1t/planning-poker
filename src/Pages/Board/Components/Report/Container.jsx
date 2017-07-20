import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import evolve from 'ramda/src/evolve'
import not from 'ramda/src/not'

import { Button } from '../../../../Shared/Components/Controls/Button'
import { Report } from './Component'
import { getAllStories } from '../../../../Data/Stories/reducer'

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

const mapStateToProp = (store, props) => ({
  game: store.games.find(g => g._id === props.match.params.gameID),
  stories: getAllStories(store)
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProp, mapDispatchToProps)(ReportContainer)
)
