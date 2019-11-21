import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:'623579214032-r4upti7624h5r6u1si8398vbhi9eriq2.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId(), this.auth.currentUser.get().w3.ig);
        }else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                    <div className="item" style={{paddingBottom:'0.67rem'}}>
                        <div className="middle aligned content" style={{marginRight:'20px'}}><p>Hi, {this.auth.currentUser.get().w3.ig}</p></div>
                        <button className="ui red google button" onClick={this.onSignOutClick}>
                            <i className = "google icon" />
                            Sign Out
                        </button>
                    </div>
                    )
        } else {
            return (
                <button className="ui red google button" onClick={this.onSignInClick}>
                    <i className = "google icon" />
                    Sign In With Google
                </button>
            )
        }
    }

    render() {
        return(
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);