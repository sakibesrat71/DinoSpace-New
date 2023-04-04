import React from 'react';
import axios from 'axios';
import { Table } from "react-bootstrap";
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import '../css/table.css';
const malta = require('multer');

const UploadMenu = () => {
    return ( <div>
        <h1>Upload Menu</h1>
        <form>
            <input type= "file" name="image" id="image" multiple />    
        </form>
    </div> );
}
 
export default UploadMenu;