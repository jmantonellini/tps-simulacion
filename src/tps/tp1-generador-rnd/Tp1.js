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
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import Histograma from "../../components/Histograma/Histograma";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Tabla from "../../components/Tabla/Tabla";
import {
  API_GENERADOR,
  API_HISTOGRAMA,
  RND_GEN_TYPES,
  RND_GEN_VAR_KEYS,
} from "../../constants";
import {
  parseFrequencyTableRows,
  frequencyTableHeaderRow,
  randomsTableHeaderRow,
  parseRandomsTableRows,
  Transition,
} from "../../utils/utilsTP1";
import "./Tp1.css";

export const Tp1 = () => {
  const [variables, setVariables] = useState({});
  const [frequencyTableRows, setFrequencyTableRows] = useState([]);
  const [randomsTableRows, setRandomsTableRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openedDialog, setOpenedDialog] = useState(false);
  const [isCustomSelected, setIsCustomSelected] = useState(true);
  const [generatorType, setGeneratorType] = useState(RND_GEN_TYPES.rndConMix);
  const [marcasClase, setMarcasClase] = useState([]);
  const [frecGeneradas, setFrecGeneradas] = useState([]);
  const [frecEsperadas, setFrecEsperadas] = useState([]);

  const handleChange = (key, value) => {
    const newVariables = { ...variables, [key]: value };
    setVariables(newVariables);
  };

  const handleCloseDialog = () => {
    setOpenedDialog(false);
  };

  const handleChangeGenerator = (event) => {
    setGeneratorType(event.target.value);
    const genType = event.target.value;
    setIsCustomSelected(genType !== RND_GEN_TYPES.rndJS);
  };

  const renderInputs = () => {
    return (
      <div className="inputContainers">
        <Tooltip
          title="Método a utilizar para generar números aleatorios"
          placement="top"
          arrow
        >
          <FormControl className="input">
            <InputLabel>Tipo</InputLabel>
            <Select
              value={generatorType}
              onChange={handleChangeGenerator}
              label="Tipo"
              size="small"
            >
              <MenuItem value={RND_GEN_TYPES.rndConMix}>Mixto</MenuItem>
              <MenuItem value={RND_GEN_TYPES.rndConMul}>
                Multiplicativo
              </MenuItem>
              <MenuItem value={RND_GEN_TYPES.rndJS}>Java</MenuItem>
            </Select>
          </FormControl>
        </Tooltip>
        <Tooltip
          title="Cantidad de números aleatorios a generar"
          placement="top"
          arrow
        >
          <div className="input">
            <TextField
              id={RND_GEN_VAR_KEYS.N}
              label="Tamaño (N)"
              required
              variant="outlined"
              value={variables?.varN}
              className="input"
              type="number"
              onChange={(event) =>
                handleChange(RND_GEN_VAR_KEYS.N, event.target.value)
              }
              size="small"
            ></TextField>
          </div>
        </Tooltip>
        <Tooltip title="Módulo a multiplicar" placement="top" arrow>
          <div className="input">
            <TextField
              id={RND_GEN_VAR_KEYS.A}
              label="A"
              required
              variant="outlined"
              value={variables?.varA}
              className="input"
              type="number"
              onChange={(event) =>
                handleChange(RND_GEN_VAR_KEYS.A, event.target.value)
              }
              disabled={!isCustomSelected}
              size="small"
            ></TextField>
          </div>
        </Tooltip>
        <Tooltip title="Módulo a multiplicar" placement="top" arrow>
          <div className="input">
            <TextField
              id={RND_GEN_VAR_KEYS.M}
              label="M"
              required
              className="input"
              variant="outlined"
              value={variables?.varM}
              type="number"
              onChange={(event) =>
                handleChange(RND_GEN_VAR_KEYS.M, event.target.value)
              }
              disabled={!isCustomSelected}
              size="small"
            ></TextField>
          </div>
        </Tooltip>
        <Tooltip title="Módulo a multiplicar" placement="top" arrow>
          <div className="input">
            <TextField
              id={RND_GEN_VAR_KEYS.C}
              label="C"
              required
              className="input"
              variant="outlined"
              value={
                generatorType !== RND_GEN_TYPES.rndConMul
                  ? variables?.varC
                  : "0"
              }
              type="number"
              onChange={(event) =>
                handleChange(RND_GEN_VAR_KEYS.C, event.target.value)
              }
              disabled={
                !isCustomSelected || generatorType === RND_GEN_TYPES.rndConMul
              }
              size="small"
            ></TextField>
          </div>
        </Tooltip>
        <Tooltip title="Módulo a multiplicar" placement="top" arrow>
          <div className="input">
            <TextField
              id={RND_GEN_VAR_KEYS.K}
              label="K"
              required
              className="input"
              variant="outlined"
              value={variables?.varK}
              type="number"
              onChange={(event) =>
                handleChange(RND_GEN_VAR_KEYS.K, event.target.value)
              }
              disabled={!isCustomSelected}
              size="small"
            ></TextField>
          </div>
        </Tooltip>
        <Tooltip
          title="Semilla utilizada al comienzo de los cálculos"
          placement="top"
          arrow
        >
          <div className="input">
            <TextField
              id={RND_GEN_VAR_KEYS.SEED}
              label="Seed"
              required
              variant="outlined"
              value={variables?.seed}
              type="number"
              onChange={(event) =>
                handleChange(RND_GEN_VAR_KEYS.SEED, event.target.value)
              }
              disabled={!isCustomSelected}
              size="small"
            ></TextField>
          </div>
        </Tooltip>
        <Tooltip
          title="Cantidad de intervalos en los que divido los datos"
          placement="top"
          arrow
        >
          <div className="input">
            <FormControl className="input">
              <InputLabel>Intervalo</InputLabel>
              <Select
                id={RND_GEN_VAR_KEYS.INTERVAL}
                value={variables?.interval}
                onChange={(event) =>
                  handleChange(RND_GEN_VAR_KEYS.INTERVAL, event.target.value)
                }
                label="Intervalo"
                size="small"
              >
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"8"}>8</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"12"}>12</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Tooltip>
      </div>
    );
  };

  const parseGeneratorResponse = (iteraciones) => {
    const newRows = iteraciones?.map((row) => parseRandomsTableRows(row));
    console.log(newRows);
    setRandomsTableRows(newRows);
  };

  const parseHistogramResponse = (intervalos) => {
    const newRows = intervalos?.map((row) => parseFrequencyTableRows(row));
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
        intervalos: variables?.[RND_GEN_VAR_KEYS.INTERVAL],
        seed: variables?.[RND_GEN_VAR_KEYS.SEED],
        mod: variables?.[RND_GEN_VAR_KEYS.M],
        multiplicador: variables?.[RND_GEN_VAR_KEYS.A],
        incremento: variables?.[RND_GEN_VAR_KEYS.C],
      }),
    });
  };

  const generateHistogram = () => {
    fetchApi(
      generatorType === RND_GEN_TYPES.rndJS
        ? API_HISTOGRAMA.lenguaje
        : API_HISTOGRAMA.custom
    )
      .then((response) => response.json())
      .then((data) => {
        parseHistogramResponse(data?.histograma?.intervalos);
        setLoading(false);
        setOpenedDialog(true);
      });
  };

  const generateRandoms = () => {
    setLoading(true);
    fetchApi(
      generatorType === RND_GEN_TYPES.rndJS
        ? API_GENERADOR.lenguaje
        : API_GENERADOR.custom
    )
      .then((response) => response.json())
      .then((data) => {
        parseGeneratorResponse(data?.tabla?.iteraciones);
        generateHistogram();
      });
  };

  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <div className="splitContainer">
          <div className="headerContainer">
            <div className="title">Simulación</div>
            <div className="title">Trabajo práctico 1</div>
          </div>
          <div className="splitHorizontalContainer">
            <div className="columnContainer">
              {renderInputs()}
              <div className="input">
                <Button
                  variant="outlined"
                  disabled={false}
                  onClick={generateRandoms}
                >
                  Generar Aleatorios
                </Button>
              </div>
            </div>
            <Tabla
              headerRow={randomsTableHeaderRow}
              tableRows={randomsTableRows}
              maxHeight={500}
            />
          </div>
        </div>
        <div className="splitContainer">
          {loading ? (
            <LoadingAnimation />
          ) : (
            <Tabla
              headerRow={frequencyTableHeaderRow}
              tableRows={frequencyTableRows}
            />
          )}
          <Histograma
            xAxis={marcasClase}
            data1={frecGeneradas}
            data2={frecEsperadas}
          />
          <div>
            <Dialog
              open={openedDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialog}
            >
              <DialogTitle>{"Felicitaciones!"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  La prueba de Chi Cuadrado ah sido aceptada
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Volver</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
