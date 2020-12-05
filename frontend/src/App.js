import React from 'react';
import './App.css';
import { Button, Container, Typography, Card, CardActions, CardContent, Select, TextField, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import gol from './assets/gol.png';
import tam from './assets/tam.png';
import azul from './assets/azul.png';
import passaredo from './assets/passaredo.png';

const COMPANIES = {
  TAM: {
    name: 'Tam',
    image: tam
  },
  ONE: {
    name: 'Passaredo',
    image: passaredo
  },
  GLO: {
    name: 'Gol',
    image: gol
  },
  AZU: {
    name: 'Azul',
    image: azul
  }
};

const useStyles = makeStyles({
  root: {
    padding: 24,
    // minHeight: 300,
    // minWidth: 300,
  },
  image: {
    width: 50,
    height: 50
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
  const [airports, setAirports] = React.useState([]);
  const [result, setResult] = React.useState({});

  React.useEffect(() => {
    (async() => {
      const response = await fetch(`http://localhost:5000/airports`).then(res => res.json());
      setAirports(response);
    })();
  }, []);
  
  const search = async() => {
    try {
      const result = await fetch(`http://localhost:5000/search?origin=${origin}&destination=${destination}&ow=${typeFlight == 1}`).then(res => res.json());
      console.log(result);
      setResult(result);
    } catch {
      alert('Não há linhas aéreas que farão este trajeto na respectiva data!');
    }
  }


  const handleChangeTypeFlight = (event) => {
    setTypeFlight(event.target.value);
  };

  const handleChangePassengers = (event) => {
    setPassengers(parseInt(event.target.value));
  };

  const handleChangeOrigin = ({ code }) => {
    setOrigin(code);
  };

  const handleChangeDestination = ({ code }) => {
    setDestination(code);
  };

  const handleDateChangeOrigin = (date) => {
    setSelectedDateOrigin(date.target.value);
  };

  const handleDateChangeDestination = (date) => {
    setSelectedDateDestination(date.target.value);
  };

  return (
    <div>
      <header className="App-header">
        <Container maxWidth="lg">
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
              {/* <br/> */}
              <div>
                <Autocomplete
                  onChange={(event, value) => handleChangeOrigin(value)}
                  options={airports}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 200, float: "left" }}
                  renderInput={(params) => <TextField {...params}  id="origin" label="Origem" />}
                />
                <Autocomplete
                  onChange={(event, value) => handleChangeDestination(value)}
                  options={airports}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 200, marginLeft: "20px", float: "left" }}
                  renderInput={(params) => <TextField {...params}  id="destination" label="Destino" />}
                />
              </div>
              <div>
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
              </div>
            </CardContent>
            <CardActions style={{justifyContent: "center"}}>
              <Button size="small" variant="contained" color="primary" onClick={search}>Pesquisar</Button>
            </CardActions>
            {result.going?.price && (
              <div>
                <Typography className={classes.title}>
                  {`Ida - R$${ result.going.price }`}
                </Typography>
                {result.going.path.map(item => (
                  <div>
                    <Typography>
                      {item}
                    </Typography>
                    <CardMedia className={classes.image} image={COMPANIES['GLO'].image} />
                    <br />
                  </div>
                ))}
              </div>
            )}
            <br />
            {result.back?.price && (
              <div>
                <Typography className={classes.title}>
                {`Volta - R$${ result.back.price }`}
                </Typography>
                {result.back.path.map(item => (
                  <div>
                    <Typography>
                      {item}
                    </Typography>
                    <CardMedia className={classes.image} image={COMPANIES['GLO'].image} />
                    <br />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Container>
      </header>
    </div>
  );
}

export default App;
