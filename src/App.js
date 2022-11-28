import logo from './logo.svg';
import './App.css';
import Game from './component/Game';

function App() {
	if (window.ethereum) {
		return (
			<div className="App">
				<Game />
			</div>
		);
	} else {
		alert("Install metamask extension!");
		return (
			<div className="App">
			</div>
		);
	}
}

export default App;
