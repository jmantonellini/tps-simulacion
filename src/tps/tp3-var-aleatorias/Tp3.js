import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Histograma from "../../components/Histograma/Histograma";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Tabla from "../../components/Tabla/Tabla";
import {
  API_GENERADORES,
  API_HISTOGRAMA,
  DISTR_KEYS,
  INPUT_TYPES,
  RND_GEN_TYPES,
  RND_GEN_VAR_KEYS,
} from "../../constants";
import {
  parseFrequencyTableRows,
  frequencyTableHeaderRow,
  randomsTableHeaderRow,
  parseRandomsTableRows,
  Transition,
  frequencyTableHeaderRowPoisson,
  parseFrequencyTableRowsPoisson,
} from "../../utils/utils";
import Styles from "./Tp3Styles.js";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LogoUtn from "../../assets/LOGO-UTN.png";
import Input from "../../components/Input/Input";

export const Tp3 = () => {
  const [variables, setVariables] = useState({
    interval: "8",
    distribucion: DISTR_KEYS.UNIFORME,
  });
  const [frequencyTableRows, setFrequencyTableRows] = useState([]);
  const [randomsTableRows, setRandomsTableRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openedDialog, setOpenedDialog] = useState(false);
  const [pruebaChiAceptada, setPruebaChiAceptada] = useState(false);
  const [generatorType, setGeneratorType] = useState(RND_GEN_TYPES.uniforme);
  const [marcasClase, setMarcasClase] = useState([]);
  const [frecGeneradas, setFrecGeneradas] = useState([]);
  const [frecEsperadas, setFrecEsperadas] = useState([]);

  const handleChange = (key, value) => {
    console.log("Handle change", key, value);
    const newVariables = { ...variables, [key]: value };
    setVariables(newVariables);
  };

  const handleCloseDialog = () => {
    setOpenedDialog(false);
  };

  const handleChangeGenerator = (event) => {
    handleChange(RND_GEN_VAR_KEYS.DISTRIBUCION, event.target.value);
    setGeneratorType(event.target.value);
  };

  const inputs = [
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Cantidad de números aleatorios a generar",
      value: variables?.varN,
      key: RND_GEN_VAR_KEYS.N,
      label: "Tamaño (N)",
      handleChange: handleChange,
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Variable A",
      value: variables?.varA,
      key: RND_GEN_VAR_KEYS.A,
      label: "A",
      handleChange: handleChange,
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Variable B",
      value: variables?.varB,
      key: RND_GEN_VAR_KEYS.B,
      label: "B",
      handleChange: handleChange,
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Media",
      value: variables?.varMedia,
      key: RND_GEN_VAR_KEYS.MEDIA,
      label: "Media",
      handleChange: handleChange,
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Desviación Estándar",
      value: variables?.varDesv,
      key: RND_GEN_VAR_KEYS.DESVIACION,
      label: "Desviación Estándar",
      handleChange: handleChange,
    },
    {
      type: INPUT_TYPES.SELECT,
      tooltip: "Cantidad de intervalos en los que divido los datos",
      value: variables?.interval,
      key: RND_GEN_VAR_KEYS.INTERVAL,
      label: "Intervalos",
      handleChange: handleChange,
      menuItems: [
        { value: "8", label: "8" },
        { value: "10", label: "10" },
        { value: "15", label: "15" },
        { value: "20", label: "20" },
      ],
    },
  ];

  const renderInputs = () => {
    return (
      <Paper style={Styles.inputsContainer}>
        <Tooltip
          title="Distribución elegida para generar los valores"
          placement="top"
          arrow
        >
          <FormControl style={Styles.input}>
            <InputLabel>Distribución</InputLabel>
            <Select
              value={variables?.distribucion}
              onChange={handleChangeGenerator}
              label="Distribución"
              size="small"
            >
              <MenuItem value={DISTR_KEYS.UNIFORME}>Uniforme</MenuItem>
              <MenuItem value={DISTR_KEYS.NORMAL}>Normal</MenuItem>
              <MenuItem value={DISTR_KEYS.POISSON}>Poisson</MenuItem>
              <MenuItem value={DISTR_KEYS.EXPONENCIAL}>Exponencial</MenuItem>
            </Select>
          </FormControl>
        </Tooltip>
        {inputs.map((input) => (
          <Input input={input} />
        ))}
      </Paper>
    );
  };

  const parseGeneratorResponse = (iteraciones) => {
    console.log(iteraciones);
    const newRows = iteraciones?.map((row) => parseRandomsTableRows(row));
    console.log(newRows);
    setRandomsTableRows(newRows);
  };

  const parseHistogramResponse = (intervalos) => {
    console.log(intervalos);
    const newRows = intervalos?.map((row) =>
      generatorType !== RND_GEN_TYPES.poisson
        ? parseFrequencyTableRows(row)
        : parseFrequencyTableRowsPoisson(row)
    );
    setFrequencyTableRows(newRows);
    obtenerMarcasClase(intervalos);
    obtenerFrecuencias(intervalos);
  };

  const obtenerMarcasClase = (intervalos) => {
    const arrayMarcas = intervalos.map((row) => row?.marcaClase);
    setMarcasClase(arrayMarcas);
  };

  const obtenerFrecuencias = (intervalos) => {
    const arrayFrecuencias = intervalos.map((row) => parseInt(row?.frecuencia));
    const arrayFrecuenciasEsp = intervalos.map((row) =>
      parseInt(row?.frecuenciaEsperada)
    );
    setFrecGeneradas(arrayFrecuencias);
    setFrecEsperadas(arrayFrecuenciasEsp);
  };

  const fetchApi = (url) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        n: variables?.[RND_GEN_VAR_KEYS.N],
        extremoIzquierdo: variables?.[RND_GEN_VAR_KEYS.A],
        extremoDerecho: variables?.[RND_GEN_VAR_KEYS.B],
        cantidadIntervalos: variables?.[RND_GEN_VAR_KEYS.INTERVAL],
        media: variables?.[RND_GEN_VAR_KEYS.MEDIA],
        desvEstandar: variables?.[RND_GEN_VAR_KEYS.DESVIACION],
      }),
    });
  };

  const generateRandoms = () => {
    setLoading(true);
    fetchApi(API_GENERADORES[generatorType])
      .then((response) => response.json())
      .then((data) => {
        parseGeneratorResponse(
          data?.generadorResponse?.tablaDto
            ? data?.generadorResponse?.tablaDto?.iteraciones
            : data?.generadorResponse?.tabla?.iteraciones
        );
        parseHistogramResponse(
          data?.generadorResponse?.histogramaDto
            ? data?.generadorResponse?.histogramaDto?.intervalos
            : data?.generadorResponse?.histograma?.intervalos
        );
        setPruebaChiAceptada(
          data?.generadorResponse?.histogramaDto
            ? data?.generadorResponse?.histogramaDto?.pruebaBondadChiCuadrado
            : data?.generadorResponse?.histogramaDto?.pruebaBondadChiCuadrado
        );
        setLoading(false);
        setOpenedDialog(true);
      })
      .catch((error) => setLoading(false));
  };

  return (
    <div style={Styles.mainContainer}>
      <div style={Styles.headerContainer}>
        <Typography variant="h4" component="div" gutterBottom>
          Variables aleatorias
        </Typography>
      </div>
      <div style={Styles.splitVerticalContainer}>
        <div style={Styles.quarterContainer(true, true)}>
          <div style={Styles.textContainer}>
            <img
              style={Styles.logo}
              className="profile-photo"
              src={LogoUtn}
              alt={"Carlie Anglemire"}
            />
            <div>
              <Typography variant="h5" component="div" gutterBottom>
                Simulación - Trabajo Práctico 3
              </Typography>
              <Typography variant="body1" component="div" gutterBottom>
                Antonellini, Juan Manuel - 60239
              </Typography>
              <Typography variant="body1" component="div" gutterBottom>
                Gavilan, Ezequiel - 67858
              </Typography>
            </div>
          </div>
          {renderInputs()}
        </div>
        <div style={Styles.quarterContainer(false, true)}>
          <Tabla
            headerRow={randomsTableHeaderRow}
            tableRows={randomsTableRows}
          />
        </div>
      </div>
      <div style={Styles.buttonContainer}>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <Button variant="outlined" disabled={false} onClick={generateRandoms}>
            Generar Aleatorios
          </Button>
        )}
      </div>
      <div style={Styles.splitVerticalContainer}>
        <div style={Styles.quarterContainer(true, false)}>
          <Tabla
            headerRow={
              generatorType !== RND_GEN_TYPES.poisson
                ? frequencyTableHeaderRow
                : frequencyTableHeaderRowPoisson
            }
            tableRows={frequencyTableRows}
          />
        </div>
        <div style={Styles.quarterContainer(false, false)}>
          <Histograma
            xAxis={marcasClase}
            data1={frecGeneradas}
            data2={frecEsperadas}
          />
        </div>
        <div>
          <Dialog
            open={openedDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
          >
            <DialogTitle>
              {pruebaChiAceptada ? "Felicitaciones!" : "Qué lástima.."}
            </DialogTitle>
            <DialogContent>
              <div style={Styles.dialogContainer}>
                <DialogContentText>
                  La prueba de Chi Cuadrado ah sido
                  {pruebaChiAceptada ? " aceptada." : " rechazada."}
                </DialogContentText>
                {pruebaChiAceptada ? (
                  <CheckCircleOutlineOutlinedIcon
                    color="success"
                    fontSize="large"
                    sx={{ marginTop: 3 }}
                  />
                ) : (
                  <CancelOutlinedIcon
                    color="error"
                    fontSize="large"
                    sx={{ marginTop: 2 }}
                  />
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Volver</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
