import React, {Component} from 'react';

import {fetchData} from '../utils';

import GLWrapper from './GLWrapper';

class App extends Component{
	constructor(props){
		super(props);

		this.state = {
			images:[],
			width:0,
			height:0
		};
	}

	componentDidMount(){
		//Compute width and height from .app
		//Updatte state and trigger re-render
		this.setState({
			width: this.appNode.clientWidth,
			height: this.appNode.clientHeight
		});

		//Request data...
		//...on data request complete, update state and trigger re-render
		fetchData()
			.then(data => {
				const {images} = this.state;
				this.setState({
					images:[...images, ...data]
				});
			});

		//Window resize event
		window.addEventListener('resize',()=>{
			this.setState({
				width: this.appNode.clientWidth,
				height: this.appNode.clientHeight
			});
		});
	}

	componentWillUnmount(){
		window.removeEventListener('resize');
	}

	render(){
		const {images,width,height} = this.state;

		return (
			<div className='app' ref={(node)=>{this.appNode = node}}>
				{width&&height&&<GLWrapper width={width} height={height} data={images}/>}
			</div>
		);
	}
}

export default App;