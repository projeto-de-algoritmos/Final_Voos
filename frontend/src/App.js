import React from 'react';
import './App.css';
import { Button, Container, Typography, Card, CardActions, CardContent, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  let d = new Date();
  let month = '' + (d.getMonth());
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  d = [year, month, day].join('-');
  const [typeFlight, setTypeFlight] = React.useState(1);
  const [passengers, setPassengers] = React.useState(1);
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [selectedDateOrigin, setSelectedDateOrigin] = React.useState(d);
  const [selectedDateDestination, setSelectedDateDestination] = React.useState(d);


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
    setSelectedDateOrigin(date.target.value);
  };

  const handleDateChangeDestination = (date) => {
    setSelectedDateDestination(date.target.value);
  };

  const flights = [{ code: "SBBR", name: "Aeroporto Internacional Presidente Juscelino Kubitschek – Brasília, Distrito Federal" }, { code: "SBGP", name: "Aeródromo de Gavião PeixotoEmbraer - (Unidade Gavião Peixoto) – Gavião Peixoto, São Paulo" }, { code: "SBLB", name: "Aeroporto de Lábrea – Lábrea, Amazonas" }, { code: "SBRB", name: "Aeroporto Internacional de Rio Branco – Rio Branco, Acre" }, { code: "SBUA", name: "Aeroporto de São Gabriel da Cachoeira – São Gabriel da Cachoeira, Amazonas" }, { code: "SBVH", name: "Aeroporto Brigadeiro Camarão – Vilhena, Rondônia" }, { code: "SBYA", name: "Aeroporto de Iauaretê – São Gabriel da Cachoeira, Amazonas" }];

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
              <div>
                <Autocomplete
                  options={flights}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 200, float: "left" }}
                  renderInput={(params) => <TextField {...params}  onChange={handleChangeOrigin} value={origin} id="origin" label="Origem" />}
                />
                <Autocomplete
                  options={flights}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 200, marginLeft: "20px", float: "left" }}
                  renderInput={(params) => <TextField {...params}  onChange={handleChangeDestination} value={destination} id="destination" label="Destino" />}
                />
              </div>
              <TextField
                id="ida"
                label="Ida"
                type="date"
                value={selectedDateOrigin}
                onChange={handleDateChangeOrigin}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{marginLeft: "80px"}}
              />
              <TextField
                id="volta"
                label="Volta"
                type="date"
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
