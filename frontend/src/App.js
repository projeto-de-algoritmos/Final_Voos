import React from 'react';
import './App.css';
import { Button, Container, CssBaseline, Typography, Card, CardActions, CardContent, InputLabel, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 36,
  },
  pos: {
    marginBottom: 12,
  },
});

function App() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    console.log({event})
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <header className="App-header">
        <Container maxWidth="md">
          <Typography className={classes.title} gutterBottom>
            Voos
          </Typography>
          <Card className={classes.root}>
            <CardContent>
              <Select
                native
                value={state.age}
                onChange={handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
                style={{top: "-10px"}}
              >
                <option value={1}>Só ida</option>
                <option value={2}>Ida e Volta</option>
              </Select>
              <TextField id="passengers" label="Passageiros" type="number" style={{marginLeft: "20px", top: "-18px"}}/>
              <br/>
              <TextField id="passengers" label="Partida" />
              <TextField id="passengers" label="Origem" style={{marginLeft: "20px"}}/>
              <TextField
                id="ida"
                label="Ida"
                type="date"
                // defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{marginLeft: "80px"}}
              />
              <TextField
                id="volta"
                label="Volta"
                type="date"
                // defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{marginLeft: "20px"}}
              />
            </CardContent>
            <CardActions style={{justifyContent: "center"}}>
              <Button size="small" variant="contained" color="primary">Pesquisar</Button>
            </CardActions>
          </Card>
        </Container>
      </header>
    </div>
  );
}

export default App;
