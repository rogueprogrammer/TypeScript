import "./styles.css";
import React, { useState } from "react";
import IntegrationsCatalog from "./components/IntegrationsCatalog";

// This interface defines the "Props" for the Textbox component.
// It specifies that the Textbox component should receive a prop named "onTextChange",
// which is a function that takes a string as an argument and returns void.
interface Props {
  onTextChange: (text: string) => void;
}

// This is a functional component that implements the Textbox component.
// The component receives its props as an argument, destructured as the "onTextChange" property.
// The type of the component is defined as React.FC (Functional Component) with the Props interface.
const Textbox: React.FC<Props> = ({ onTextChange }) => {
  // This line sets up a state variable named "text" with an initial value of an empty string.
  const [text, setText] = useState("");

  // This function is called whenever the text input changes.
  // It updates the "text" state variable and calls the "onTextChange" prop with the new text.
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    onTextChange(event.target.value);
  };

  // This is the JSX code that will be rendered as the UI of the Textbox component.
  // It's a single input element that is bound to the "text" state variable.
  // When the value of the input changes, the "handleTextChange" function is called.
  return (
    <div>
      <input
        type="text"
        value={text}
        onClick={handleTextChange}
      />
    </div>
  );
};

// This is a default-exported function component that implements the App component.
export default function App() {
  // This line sets up a state variable named "searchText" with an initial value of an empty string.
  const [searchText, setSearchText] = useState("");
 
  // This line sets up a state variable named "results" with an initial value of "null".
  const [results, setResults] = useState<{} | null>(null);

  // This function is called when the text input changes.
  // It updates the "searchText" state variable with the new text.
  const handleTextChange = (text: string) => {
    setSearchText(text);
  };

  // This function is called when the "Search" button is clicked.
  // It calls a "paragon.workflow" function and updates the "results" state variable with the result.
  const invokeListMetadata = async () => {
    const resultsData = await paragon.workflow("3f6019d3-66a9-4d52-bb48-8261aca7224a", {
    });

    // If the results are not undefined, update the "results" state variable with the results.
    if (resultsData) {
      setResults(resultsData);
    }
  };

  // This is the JSX code that will be rendered as the UI of the App component.
// return JSX for the component
  return (
    <div className="App">
      {/* render the IntegrationsCatalog component */}
      <IntegrationsCatalog />
      {/* render the Textbox component with the onTextChange prop set to handleTextChange */}
      <Textbox onTextChange={handleTextChange} />
      {/* button with its onClick event handler set to invokeListMetadata */}
      <button onClick={invokeListMetadata}>Search</button>
      {/* if there are results, render a div with the results */}
      {results && (
        <div>
          Results:
          {/* stringify the results and format with 2 spaces for indentation */}
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )
