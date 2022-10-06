import React , { useState }from 'react';
import { Button } from 'reactstrap';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup,
} from 'reactstrap';


class StopwatchHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            modal: false,
            editmodal:false,
            unmountOnClose: true,
            title: "",
            description: "",
            times: "",
            editvalue:-1
        };
    }

    componentDidMount() {
        this.setHistoryState();
    }

    setHistoryState = () => {
            this.setState({ history:[]});
    }; 
     toggle = () => {
         this.setState({ modal: !this.state.modal }); 
    }
   edittoggle = () => {
        this.setState({ editmodal: !this.state.editmodal }); 
   }
     changeUnmountOnClose = (e) => {
        let { value } = e.target;
         this.setState({ unmountOnClose: this.state.JSON.parse(value) });
      };
    saveToLocalStorage = () => {
            this.setState({times: ` ${this.state.title}=> ${this.state.description} => ${this.props.formatTime(
                this.props.currentTimeMin
            )}:${this.props.formatTime(
                this.props.currentTimeSec
            )}:${this.props.formatTime(this.props.currentTimeMs, 'ms')}`})
               
      
        
        this.setState({title:""})
    };

    saveTime = () => {
        setTimeout(()=>this.setState({ history: [...this.state.history, this.state.times] } ), 100);
        this.saveToLocalStorage()
         this.toggle();
    };

    resetHistory = () => {
        this.setHistoryState();
    };

    handleChange = (event) => {
        this.setState({ title: event.target.value });
    };
    handledesc = (event) => {
        this.setState({ description: event.target.value });
    };
    render() {
        return (
            <div className={'stopwatch__history'} >
<div style={{ "padding": "20px 0 20px 0"}}      >
                    <Button color="primary"
                        onClick={() => { this.toggle(); this.setState({ title: "",description:"" }) }}>SAVE TIME</Button> {' '}
    <Button color="primary"
            onClick={this.resetHistory}>RESET HISTORY</Button>
                </div>
                
      <Modal isOpen={this.state.modal} toggle={this.state.toggle} unmountOnClose={this.state.unmountOnClose}>
        <ModalHeader toggle={this.state.toggle}>Save Task</ModalHeader>
        <ModalBody>
        Title : <Input type="text" value={this.state.editvalue<=-1 ? this.state.title : this.state.history[this.state.editvalue].split("=")[0]} onChange={(e)=>this.handleChange(e)}
></Input>
                        Description : <Input
                            value={this.state.editvalue <= -1 ? this.state.description : this.state.history[this.state.editvalue].split("=>")[1]} onChange={(e) => this.handledesc(e)}
            type="textarea"
            placeholder="enter description"
            rows={2}
          />
        </ModalBody>
        <ModalFooter>
                        <Button color="primary" onClick={() => { if (this.state.editvalue >= 0) { this.toggle(); this.setState({editvalue:-1}) }else{  this.saveTime();  this.setState({title:""})}}}>
            Save
          </Button>{' '}
                        <Button color="secondary" onClick={() => { this.toggle(); this.setState({editvalue:-1})}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
   
                
                <h3>Saved Task</h3>
                <ul>
                    {this.state.history.map((item, index) => <div key={index}><li >{item}</li> <Button color='danger' onClick={() => { this.toggle();this.setState({editvalue:index}) }} >Edit</Button></div>)} 
                </ul>
            </div>
        );
    }
}

export default StopwatchHistory;
