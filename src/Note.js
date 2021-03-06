import React, {Component} from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';

class Note extends Component{

	constructor(props){
		super(props);
		this.state = { editing:false }
		this.editButton = this.editButton.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.save = this.save.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this);
		this.delButton = this.delButton.bind(this);
		this.randomBetween = this.randomBetween.bind(this);
	}

	componentWillMount() {
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 150, 'px'),
			top: this.randomBetween(0, window.innerHeight - 150, 'px'),
			transform: `rotate(${this.randomBetween(-25,25,'deg')}`
		}

	}

	randomBetween(x,y,s) {
		return x + Math.ceil(Math.random() * (y-x)) + s 
	}

	componentDidUpdate() {
		var textArea;
		if(this.state.editing) {
			textArea = this._newText;
			textArea.focus();
			textArea.select();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return(
				 this.props.children !== nextProps.children || this.state !== nextState
			)

	}

	delButton(){
		
		this.props.onRemove(this.props.index)
	}

	editButton(){
		this.setState({ editing: true });
		console.log('editing this note')
	}

	save(e) {
		e.preventDefault()
		this.props.onChange(this._newText.value, this.props.index)
		this.setState({
			editing: false
		})
	}

	renderForm(){
		return(
			<div className="note" style={this.style}>
				<form onSubmit={this.save}>
					<textarea ref={input => this._newText = input} defaultValue={this.props.children}/>
					<button id="save"> <FaSave /></button>
				</form>			
			</div>
			)
	}

	renderDisplay(){

		return (
				<div className="note" style={this.style}>

					<p> {this.props.children}</p> 

					<span>
						<button onClick={this.editButton} id="edit"> <FaPencilAlt /></button>
						<button onClick={this.delButton} id="remove"> <FaTrash /></button>
					</span>

				</div>
			)
	}

	render(){
		
			if(this.state.editing){

				return this.renderForm();

			}else{
				return this.renderDisplay();
			}

		
	}
}

export default Note;