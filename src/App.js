import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import Accueil from './pages/Accueil.js';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Contact from './pages/Contact.js';
import MPoublie from './pages/MPoublie.js';
import NewMP from './pages/NewMP.js';
import Account from './pages/Account.js';
import ChangeAccount from './pages/ChangeAccount.js';
import ChangePassword from './pages/ChangePassword.js';
import DeleteAccount from './pages/DeleteAccount.js';
import HomePage from './pages/HomePage';
import CreateCopro from './pages/CreateCopro';
import DetailCopro from './pages/DetailCopro';
import DeleteCopro from './pages/DeleteCopro.js';
import CreateCommonKey from './pages/CreateCommonKey';
import CreatePrivateKey from './pages/CreatePrivateKey.js';
import DetailCommonKey from './pages/DetailCommonKey';
import DetailPrivateKey from './pages/DetailPrivateKey.js';
import ModifPrivateKey from './pages/ModifPrivateKey.js';
import ModifCopro from './pages/ModifCopro.js';
import DeleteCommonKey from './pages/DeleteCommonKey.js';
import DeletePrivateKey from './pages/DeletePrivateKey.js';
import CreateTrackCommon from './pages/CreateTrackCommon';
import CreateTrackPrivate from './pages/CreateTrackPrivate.js';
import ReturnTrackCommon from './pages/ReturnTrackCommon';
import ReturnTrackPrivate from './pages/ReturnTrackPrivate.js';
import ModifKey from './pages/ModifKey.js';
import PrivateRoute from './utils/PrivateRoute';
import Header from './components/Header'
import CreateManyCopro from './pages/Sendfiles.js';


function App(){
  const [title, setTitle] = useState()
  return (
    <div className="Main">
      <Router>
        <AuthProvider>
          <Header className='Header' title={title}/>
          <Routes>
            <Route element={<Accueil setTitle={setTitle}/>} path='/' exact/>
            <Route element={<PrivateRoute><HomePage setTitle={setTitle}/></PrivateRoute>} path='/Homepage'/>
            <Route element={<PrivateRoute><Account setTitle={setTitle}/></PrivateRoute>} path='/account'/>
            <Route element={<PrivateRoute><DeleteAccount setTitle={setTitle}/></PrivateRoute>} path='/account/delete'/>
            <Route element={<PrivateRoute><ChangeAccount setTitle={setTitle}/></PrivateRoute>} path='/account/Modif'/>
            <Route element={<PrivateRoute><ChangePassword setTitle={setTitle}/></PrivateRoute>} path='/account/Password'/>
            <Route element={<PrivateRoute><DetailCopro setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete'/>
            <Route element={<PrivateRoute><CreateCopro setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/Create'/>
            <Route element={<PrivateRoute><CreateManyCopro setTitle={setTitle}/></PrivateRoute>} path='/listeCoproprietes/Create'/>
            <Route element={<PrivateRoute><ModifCopro setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete/Modif'/>
            <Route element={<PrivateRoute><DeleteCopro setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete/Delete'/>
            <Route element={<PrivateRoute><CreateCommonKey setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete/CommonKey/Create'/>
            <Route element={<PrivateRoute><CreatePrivateKey setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete/PrivateKey/Create'/>
            <Route element={<PrivateRoute><DetailCommonKey setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete/CommonKey/:IdKey'/>
            <Route element={<PrivateRoute><DetailPrivateKey setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete/PrivateKey/:IdKey'/>
            <Route element={<PrivateRoute><ModifKey setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete/CommonKey/:IdKey/Modif'/>
            <Route element={<PrivateRoute><DeleteCommonKey setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete/CommonKey/:IdKey/Delete'/>
            <Route element={<PrivateRoute><DeletePrivateKey setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete/PrivateKey/:IdKey/Delete'/>
            <Route element={<PrivateRoute><ModifPrivateKey setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/:IdCopropriete/PrivateKey/:IdKey/Modif'/>
            <Route element={<CreateTrackCommon setTitle={setTitle}/>} path='/Copropriete/CommonKey/track/:IdKey/'/>
            <Route element={<PrivateRoute><ReturnTrackCommon setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/CommonKey/Returntrack/:IdKey/'/>
            <Route element={<CreateTrackPrivate setTitle={setTitle}/>} path='/Copropriete/PrivateKey/track/:IdKey/'/>
            <Route element={<PrivateRoute><ReturnTrackPrivate setTitle={setTitle}/></PrivateRoute>} path='/Copropriete/PrivateKey/Returntrack/:IdKey/'/>
            <Route element={<Login setTitle={setTitle}/>} path='/login'/>
            <Route element={<MPoublie setTitle={setTitle}/>} path='/MPoublie'/>
            <Route element={<NewMP setTitle={setTitle}/>} path='/MotdePasseOublie/:token'/>
            <Route element={<SignIn setTitle={setTitle}/>} path='/signIn' />
            <Route element={<Contact setTitle={setTitle}/>} path='/Contact'/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
