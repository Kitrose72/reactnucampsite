import React, { Component } from 'react';
import { Select, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

// import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
        isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
  }

  submitComment() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
    alert(this.state.rating)
  }

  render() {
    return(
      <>
        <Button outline className="fa-lg" onClick={this.toggleModal}>
          {/* <FontAwesomeIcon className="fa-solid fa-pen" /> */}
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor=".rating">Rating</Label>
                                <Control.select model="rating" id="rating">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor=".author">Author</Label>
                                <Control.text model="author" type="text" id="author" name="author"/>
                            </FormGroup>
                            <FormGroup check>
                              <Label htmlFor="text">Comment</Label>
                                <Control.textarea model=".text" type="textarea" name="text" id="text"/>
                            </FormGroup>
                            <Button color="primary" onClick={this.submitComment}>Submit Comment</Button>
                        </Form>
                    </ModalBody>
                </Modal>
      </>
    )
  }
}

function RenderCampsite({campsite}) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
        <CardBody>
            <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function handleSubmit(values) {
  this.toggleModal();
  this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
}

function RenderComments({comments, postComment, campsiteId}) {
  if(comments){
    return(
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map(comment =>
            <p key={comment.id}>{comment.text}
              <p>
                --{comment.author}, {new Intl.DateTimeFormat('en-US',  { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
              </p>
            </p>
          )
        }
         <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    );
  }
  return(
    <div></div>
  );
}

function CampsiteInfo(props) {
  if (props.isLoading) {
      return (
          <div className="container">
              <div className="row">
                  <Loading />
              </div>
          </div>
      );
  }
  if (props.errMess) {
      return (
          <div className="container">
              <div className="row">
                  <div className="col">
                      <h4>{props.errMess}</h4>
                  </div>
              </div>
          </div>
      );
  }
  if (props.campsite) {
    return (
      <div className="container">
          <div className="row">
              <div className="col">
                  <Breadcrumb>
                      <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                      <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <h2>{props.campsite.name}</h2>
                  <hr />
              </div>
          </div>
          <div className="row">
              <RenderCampsite campsite={props.campsite} />
              <RenderComments
                comments={props.comments}
                postComment={props.postComment}
                campsiteId={props.campsite.id}
              />
          </div>
      </div>
  );
  }
  return <div />;
}

export default CampsiteInfo;