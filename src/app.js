// Requiere: express, mongoose, body-parser, cors (instala con npm si no los tienes)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken, JWT_SECRET } = require("./utils/jwt");
const authenticate = require("./middleware/auth");
require('dotenv').config();

const app = express(); // ✅ DECLARADO AQUÍ UNA SOLA VEZ

// Middleware
app.use(cors());
app.use(express.json());

// Rutas externas (asegúrate de que esta ruta existe)
const heroGrupoRoutes = require('./routes/heroGrupoMultimedia.routes');
app.use('/heroesgrupos', heroGrupoRoutes); // ✅ DESPUÉS de declarar 'app'

// app.js


// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors()); // ✅ permite solicitudes desde cualquier origen
app.use(express.json());

// ... resto del código
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb+srv://admin:admin123@cluster0.3fihmjk.mongodb.net/HeroesMobile?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Connection error:", err));

// ======================== SCHEMAS ========================
const heroSchema = new mongoose.Schema({
  nombre: String,
  bio: String,
  img: String,
  aparicion: String,
  casa: String,
});

const grupoMultimediaSchema = new mongoose.Schema({
  nombre: String,
  estado: String,
  usuario: String,
  fechaCreacion: { type: Date, default: Date.now },
});

const multimediaSchema = new mongoose.Schema({
  url: String,
  tipo: String,
  estado: Boolean,
  idGrupoMultimedia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GrupoMultimedia",
  },
});
const multimediaHeroesSchema = new mongoose.Schema({
  idHeroe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Heroes",
    required: true,
  },
  idMultimedia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Multimedias",
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  nombre: String,
  username: { 
    type: String, 
    required: true,
    unique: true 
  },
  password: { 
    type: String,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Heroes = mongoose.model("Heroes", heroSchema, "Heroes");
const GrupoMultimedia = mongoose.model(
  "GrupoMultimedia",
  grupoMultimediaSchema,   "GrupoMultimedias"
);
const MultimediaHeroe = mongoose.model(
  "MultimediaHeroes",
  multimediaHeroesSchema, "MultimediaHeroes"
);
const Multimedia = mongoose.model("Multimedias", multimediaSchema, "Multimedias");
const User = mongoose.model("User", userSchema);

// ======================== AUTH ROUTES ========================
// Register User
app.post("/api/auth/register", async (req, res) => {
  try {
    const { nombre, username, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      nombre,
      username,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        nombre: user.nombre,
        username: user.username,
        token: generateToken(user),
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Login User
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Return user with token
    res.json({
      _id: user._id,
      nombre: user.nombre,
      username: user.username,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Get User Profile
app.get("/api/auth/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Public welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a Heroes API - Usa /api/auth/login para comenzar' });
});

// ======================== CRUD ========================

// HERO
app.get("/heroes", authenticate, async (req, res) => {
    const data = await Heroes.find();
    res.json(data);
});
app.post("/heroes", authenticate, async (req, res) => res.json(await Heroes.create(req.body)));
app.put("/heroes/:id", authenticate, async (req, res) =>
  res.json(await Heroes.findByIdAndUpdate(req.params.id, req.body, { new: true }))
);
app.delete("/heroes/:id", authenticate, async (req, res) =>
  res.json(await Heroes.findByIdAndDelete(req.params.id))
);
app.get("/heroes/:id", authenticate, async (req, res) => {
  try {
    const hero = await Heroes.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: "Héroe no encontrado" });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
});

// GRUPO MULTIMEDIA
app.get("/grupomultimedias", authenticate, async (req, res) =>
  res.json(await GrupoMultimedia.find())
);
//esto lo cambie quizas no deba?----------------------------------------------

app.get("/grupomultimedias/:heroId", authenticate, async (req, res) => {
  const heroId = req.params.id;
  const foundGrupo = await GrupoMultimedia.find({});

  return res.json(await GrupoMultimedia.find());
});

app.post("/grupomultimedias", authenticate, async (req, res) =>
  res.json(await GrupoMultimedia.create(req.body))
);
app.put("/grupomultimedias/:id", authenticate, async (req, res) =>
  res.json(
    await GrupoMultimedia.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  )
);
app.delete("/grupomultimedias/:id", authenticate, async (req, res) =>
  res.json(await GrupoMultimedia.findByIdAndDelete(req.params.id))
);

// MULTIMEDIA
app.get("/multimedias", authenticate, async (req, res) => res.json(await Multimedia.find()));
app.get("/multimedias/heroe/:idHeroe", authenticate, async (req, res) =>
  res.json(await Multimedia.find({ idHeroe: req.params.idHeroe }))
);
app.post("/multimedias", authenticate, async (req, res) =>
  res.json(await Multimedia.create(req.body))
);
app.put("/multimedias/:id", authenticate, async (req, res) =>
  res.json(
    await Multimedia.findByIdAndUpdate(req.params.id, req.body, { new: true })
  )
);
app.delete("/multimedias/:id", authenticate, async (req, res) =>
  res.json(await Multimedia.findByIdAndDelete(req.params.id))
);

// MULTIMEDIA HEROES

app.get("/multimediaheroes/", authenticate, async (req, res) => {
  const data = await MultimediaHeroe.find()
    .populate("idHeroe")
    .populate("idGrupoMultimedia");
  res.json(data);
});

app.get("/multimediaheroes/hero/:idHeroe", authenticate, async (req, res) => {
  const data = await MultimediaHeroe.find({
    idHeroe: req.params.idHeroe,
  }) .populate("idMultimedia")  // 🔧 AÑADE ESTO
  .populate("idGrupoMultimedia");
  res.json(data);
});

app.post("/multimediaheroes/", authenticate, async (req, res) => {
  const newRelation = await MultimediaHeroe.create(req.body);
  res.json(newRelation);
});

app.put("/multimediaheroes/:id", authenticate, async (req, res) => {
  const updated = await MultimediaHeroe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.delete("/multimediaheroes/:id", authenticate, async (req, res) => {
  const deleted = await MultimediaHeroe.findByIdAndDelete(req.params.id);
  res.json(deleted);
});
// ============================ USUARIOS ============================
// Protected User routes (admin only)
app.get("/users", authenticate, async (req, res) => {
  // Only allow access if user has admin privileges (you can implement this check later)
  res.json(await User.find().select('-password'));
});

// ======================== INICIAR SERVIDOR ========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 API running on http://0.0.0.0:${PORT}`);
  console.log(`🔗 Access locally via http://localhost:${PORT}`);
  console.log(`🌐 Access from network via http://<your-ip-address>:${PORT}`);
});
