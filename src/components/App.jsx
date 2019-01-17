import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import searchYouTube from '../lib/searchYouTube.js';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      currentVideo: exampleVideoData[0],
      searchValue: ''
    };
    this.delayedCallback = _.debounce(searchYouTube.bind(this), 1000);
  }

  onVideoTitleClick(video) {
    this.setState({
      currentVideo: video
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><Search searchHandler={this.onSearchKeyPress.bind(this)}/></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><VideoPlayer video={this.state.currentVideo} /></div>
          </div>
          <div className="col-md-5">
            <div><VideoList videos={this.state.videos} callback={this.onVideoTitleClick.bind(this)}/></div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    searchYouTube({
      max: 10,
      query: this.state.searchValue
    }, (data) => {
      this.setState({
        videos: data.items
      });
    });
  }

  onSearchKeyPress(value) {
    this.setState({
      searchValue: value
    });

    this.delayedCallback({
      max: 10,
      query: this.state.searchValue
    }, (data) => {
      this.setState({
        videos: data.items
      });
    });
  }
}



ReactDOM.render(<App />, document.getElementById('app'));

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
