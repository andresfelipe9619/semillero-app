import React from 'react';
import { Typography, Button, Link, Paper, Box, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles(theme => ({
  image: {
    margin: theme.spacing(1),
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(4),
  },
}));

function Adornment({ top = 40, color, width = 80 }) {
  return (
    <div
      style={{
        top,
        width,
        height: 30,
        background: color,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        position: 'absolute',
        right: 0,
      }}
    />
  );
}

export default function TermsAndConditions({ onClick }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" height="100%">
      <Paper elevation={6} className={classes.paper}>
        <Adornment top={30} color={theme.palette.secondary.main} />
        <Adornment top={40} color={theme.palette.primary.main} width={40} />
        <Box>
          <img
            width={80}
            height={'auto'}
            className={classes.image}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Univalle.svg/1200px-Univalle.svg.png"
          />
          <img
            width={140}
            height={'auto'}
            className={classes.image}
            src="https://assets.isu.pub/document-structure/200910202646-e04ba63e6e23b4decece88b4f4166831/v1/99f251e63e0005ad70a25cdb1fb8e4bf.jpg"
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
      </Paper>
    </Box>
  );
}
