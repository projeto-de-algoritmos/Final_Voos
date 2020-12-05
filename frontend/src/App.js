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
  const [typeFlight, setTypeFlight] = React.useState(1);
  const [passengers, setPassengers] = React.useState(1);
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [selectedDateOrigin, setSelectedDateOrigin] = React.useState(new Date());
  const [selectedDateDestination, setSelectedDateDestination] = React.useState(new Date());


  const handleChangeTypeFlight = (event) => {
    setTypeFlight(event.target.value);
  };

  const handleChangePassengers = (event) => {
    setPassengers(parseInt(event.target.value));
  };

  const handleChangeOrigin = (event) => {
    setOrigin(event.target.value);
  };

  const handleChangeDestination = (event) => {
    setDestination(event.target.value);
  };

  const handleDateChangeOrigin = (date) => {
    setSelectedDateOrigin(date);
  };

  const handleDateChangeDestination = (date) => {
    setSelectedDateDestination(date);
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
                value={typeFlight}
                onChange={handleChangeTypeFlight}
                style={{top: "-10px"}}
              >
                <option value={1}>Só ida</option>
                <option value={2}>Ida e Volta</option>
              </Select>
              <TextField onChange={handleChangePassengers} value={passengers} id="passengers" label="Passageiros" type="number" style={{marginLeft: "20px", top: "-18px"}}/>
              <br/>
              <TextField onChange={handleChangeOrigin} value={origin} id="origin" label="Origem" />
              <TextField onChange={handleChangeDestination} value={destination} id="destination" label="Destino" style={{marginLeft: "20px"}}/>
              <TextField
                id="ida"
                label="Ida"
                type="date"
                // defaultValue="2017-05-24"
                value={selectedDateOrigin}
                onChange={handleDateChangeOrigin}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{marginLeft: "80px"}}
              />
              {console.log({selectedDateOrigin})}
              <TextField
                id="volta"
                label="Volta"
                type="date"
                // defaultValue="2017-05-24"
                value={selectedDateDestination}
                onChange={handleDateChangeDestination}
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
