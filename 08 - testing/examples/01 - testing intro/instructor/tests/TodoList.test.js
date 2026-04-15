// Any *.test.js file will be picked up and ran by jest.

// It's not REQUIRED to name a test after the file it's got tests for (e.g. TodoList),
// but that helps keep things organised; it'd be a total mess otherwise.

/* 'DNA' of a test:

    jest docs:                  https://jestjs.io/docs/getting-started
    jest cheat-sheeet:          https://github.com/sapegin/jest-cheat-sheet
    react testing-library docs: https://testing-library.com/docs/react-testing-library/example-intro


    test(
      'humanised name of the test so it's easy to read in console',
      () => {
        // callback function: the test itself, three informal parts:
        //   a) setup
        //   b) execution
        //   c) assertion
      }
    )
*/

import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import TodoList from '../components/TodoList';


// Test 1/2: syntax introduction; we'll just write a silly test to check typography rendering
test(
  'title & add button render correctly',
  () => {
    // a) setup
    render(<TodoList />) // implicitly produces a screen (used below) 'containing' the rendered DOM

    // b) execution (logic required to produce test result)
    const titleElement = screen.getByText("Our Todo List")
    const addButton = screen.getByText("Add Todo")
    // ^ normally, I would never ever ever *ever* snipe an object based on text value (rather,
    //   things like ID, key, attributes, etc.) but this is an easy intro into poking the actual UI

    // c) assertion / expectation
    expect(titleElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();


  }
)


// Test 2: acting/events, testing that todo list item is added correctly
test(
  'todo list item is added correctly',
  () => {
    // a) setup
    render(<TodoList />)
    const EXPECTED_STRING = "Learn Testing in Javascript"

    // b) execution
    const inputElement = screen.getByLabelText("New Todo")   // or .getByTestId("new-todo-input")
    const buttonElement = screen.getByText("Add Todo")       // or .getByTestId("add-new-todo-button")
    const listElement = screen.getByTestId("todo-item-list") // see: data-testid prop on List/Button/etc.

    // simulate an actual event -> event.target.value will be EXPECTED_STRING for text input
    // -> given our programmatic logic, this should change the value of todoText stateful variable  
    fireEvent.change(inputElement, {
      target: { value: EXPECTED_STRING}
    })

    // simulate a click on the button element
    act(()=>{
      buttonElement.click()
    })

    // c) assertion / expectation
    expect(inputElement.value).toBe('')
    expect(listElement).toHaveTextContent(EXPECTED_STRING)
  }
)