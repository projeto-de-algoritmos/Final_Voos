import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import gol from './assets/gol.png';
import tam from './assets/tam.png';
import azul from './assets/azul.png';
import passaredo from './assets/passaredo.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 200
  },
  title: {
    fontSize: 36,
  },
  image: {
    width: 50,
    height: 50
  }
});

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

const Flight = ({
  company = 'GLO',
  price = '90.90',
  origin = 'BSB',
  destination = 'SP'
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {`R$${ price }`}
        </Typography>
        <Typography className={classes.title} gutterBottom>
          {`${ origin } - ${ destination }`}
        </Typography>
        <CardMedia className={classes.image} image={COMPANIES[company].image} />
      </CardContent>
    </Card>
  );
};

export default Flight;
