import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
const Display = props => {
  return (
    <div
      id="display"
      dangerouslySetInnerHTML={{ __html: props.audioOnDisplay }}
    ></div>
  );
};
const DrumAudio = props => {
  return (
    <audio
      id={props.keySymbol}
      className="clip"
      src={props.audioSource}
    ></audio>
  );
};
const DrumPad = props => {
  return (
    <div
      className="drum-pad"
      id={props.audioDescription}
      onKeyDown={props.onKeyDown}
      onClick={props.onClick}
    >
      <div className="drum-pad-content">{props.keySymbol}</div>
      <DrumAudio keySymbol={props.keySymbol} audioSource={props.audioSource} />
    </div>
  );
};

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioOnDisplay: "hola",
      keySymbols: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"],
      audioSources: [
        "https://res.cloudinary.com/dmujv3o3b/video/upload/v1579777524/CYCdh_VinylK3-Perc01.wav",
        "https://res.cloudinary.com/dmujv3o3b/video/upload/v1579777207/CYCdh_ElecK04-HfHat.wav",
        "https://res.cloudinary.com/dmujv3o3b/video/upload/v1579776865/CYCdh_VinylK1-OpHat.wav",
        "https://res.cloudinary.com/dmujv3o3b/video/upload/v1579777990/CYCdh_Kurz03-SdSt.wav",
        "https://res.cloudinary.com/dmujv3o3b/video/upload/v1579777661/CYCdh_VinylK2-Snr01.wav",
        "https://res.cloudinary.com/dmujv3o3b/video/upload/v1579777348/CYCdh_ElecK05-Snr03.wav",
        "https://res.cloudinary.com/dmujv3o3b/video/upload/v1579777096/CYCdh_ElecK04-Snr03.wav",
        "https://res.cloudinary.com/dmujv3o3b/video/upload/v1579776916/CYCdh_VinylK1-Kick03.wav",
        "https://res.cloudinary.com/dmujv3o3b/video/upload/v1579777714/CYCdh_VinylK2-Tom02.wav"
      ],
      audioDescriptions: [
        "VinylK3-Perc01",
        "ElecK04-HfHat",
        "VinylK1-OpHat",
        "Kurz03-SdSt",
        "VinylK2-Snr01",
        "ElecK05-Snr03",
        "ElecK04-Snr03",
        "VinylK1-Kick03",
        "VinylK2-Tom02"
      ]
    };
    this.actualizer = this.actualizer.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.drumPadsGenerator = this.drumPadsGenerator.bind(this);
  }
  actualizer(e) {
    this.setState({ audioOnDisplay: e.target.id });
  }
  onClick(e) {
    this.actualizer(e);
    const audioId = e.target.innerText;
    /*let bang = document.querySelectorAll("audio");
    for (let i = 0; i < bang.length; i++) {
      bang[i].load();
    }*/
    document.getElementById(audioId).load();
    document.getElementById(audioId).play();
  }
  onKeyDown(e) {
    let keyValue = e.key.toUpperCase();
    this.setState({
      audioOnDisplay: document.getElementById(keyValue).parentNode.id
    });
    document.getElementById(keyValue).play();
  }
  drumPadsGenerator() {
    let drumPads = [];
    for (let i = 0; i < 9; i++) {
      drumPads.push(
        <DrumPad
          audioDescription={this.state.audioDescriptions[i]}
          keySymbol={this.state.keySymbols[i]}
          audioSource={this.state.audioSources[i]}
          onClick={this.onClick}
          tabIndex="0"
        />
      );
    }
    return drumPads;
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }
  render() {
    return (
      <div id="drum-machine">
        <Display audioOnDisplay={this.state.audioOnDisplay} />
        <div id="drum-pads-container">
          {this.drumPadsGenerator()}
          <div id="pedals"></div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Project />, document.getElementById("forReactContent"));
