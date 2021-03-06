import React, { Component } from 'react';
import firebase, { db } from '../../../firebase';
import { Link } from 'react-router-dom';

class FirmaDetay extends Component {

  constructor(props) {
    console.log(' Detail geldi');
    super(props);
    this.state = {
      firma: {}, 
      key: ''
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    const ref = db.collection('Firmalar').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          firma: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('Firmalar').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
          <h4><Link to="/">Firma Detay</Link></h4>
            <h3 className="panel-title">
              {this.state.firma.title}
            </h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.firma.description}</dd>
              <dt>Author:</dt>
              <dd>{this.state.firma.author}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FirmaDetay;