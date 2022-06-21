import React from 'react';
import { Typography, Button, Link, Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Card from '../card/Card';

const useStyles = makeStyles(theme => ({
  image: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(4),
  },
}));

const UnivalleURL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Univalle.svg/1200px-Univalle.svg.png';
const SemilleroURL =
  'https://assets.isu.pub/document-structure/200910202646-e04ba63e6e23b4decece88b4f4166831/v1/99f251e63e0005ad70a25cdb1fb8e4bf.jpg';

export default function TermsAndConditions({ onClick }) {
  const classes = useStyles();

  return (
    <Card>
      <Box>
        <img
          width={80}
          height={'auto'}
          className={classes.image}
          src={UnivalleURL}
        />
        <img
          width={140}
          height={'auto'}
          className={classes.image}
          src={SemilleroURL}
        />
      </Box>
      <Typography variant="h1" paragraph align="center">
        Formulario de inscripción al Semillero
      </Typography>
      <Grid container>
        <Grid item md={4} container justifyContent="center">
          <VerifiedUserIcon
            color="primary"
            style={{ marginTop: 80, width: 100, height: 100 }}
          />
        </Grid>
        <Grid item md={8}>
          <Typography variant="h2" paragraph>
            Términos y condiciones
          </Typography>
          <Typography paragraph>
            Al enviar este formulario usted autoriza a la Universidad de Valle
            de que maneje sus datos personales con fines academicos, estudios
            estadisticos y/o socioeducativos.
          </Typography>
          <Typography paragraph>
            He leido y acepto las Condiciones generales y estoy de acuerdo con
            la Politica de privacidad al respecto del tratamiento de datos
            personales de la Universidad del Valle.
          </Typography>
          <Link>
            https://drive.google.com/file/d/ljN7iv1KtLwbGuP6cvGUbL6NZHGO-32tZ/view?usp=sharins
          </Link>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              color="primary"
              variant="contained"
              onClick={onClick}
              className={classes.button}
            >
              Acepto
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
