import { Component } from "react";
import { ErrorModal } from "../components/modals/ErrorModal";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: "" };
    }

    componentDidCatch(error) {
        this.state = { hasError: true, errorMessage: error.error_description || error.message };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.error_description || error.message };
    }

    render() {
        return (<>
            <ErrorModal
                closeHandler={() => this.setState({ hasError: false, errorMessage: "" })}
                isVisible={this.hasError}
                message={this.errorMessage} />

            {this.props.children}
        </>);
    }
}