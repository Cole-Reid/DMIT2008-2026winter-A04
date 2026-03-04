import { useState } from 'react';

// MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';



export default function TodoList() {

  /* [stateVariable, stateVariableSetter] = useState(defaultValue)

      [variable, function] -> think [noun, verb]

      The setter is the *only* thing allowed to change the value of the state variable.

      When the setter function fires (i.e. data in the state variable changes), the component
      automatically re-renders.
  */
  const [todoText, setTodoText] = useState("")

  const onTodoTextChange = (event) => {
    // Call the state variable's setter with a new value to write to that variable.
    setTodoText(event.target.value)
    console.log(event.target.value)
  }

  const onAddTodoClick = () => {
    console.log("clicked!")
  }


  return <Box sx={{ flexGrow: 1 }}>

      <Grid container spacing={2}>

          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              Our Todo List
            </Typography>
          </Grid>

          <Grid item xs={10}>
              <TextField
                  id="standard-basic"
                  label="New Todo Item"
                  variant="standard"
                  sx={{ width: '100%' }}
                  onChange={onTodoTextChange}
                  value={todoText}
              />
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={onAddTodoClick}
            >Add Todo</Button>
          </Grid>

          Our todo text is: {todoText}

    </Grid>
  </Box>
}
