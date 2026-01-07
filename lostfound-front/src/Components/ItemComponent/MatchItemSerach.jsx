import React,{ useEffect, useState } from 'react';
import { useNavigate,useParams,Link } from 'react-router-dom';
import {getLostItemById} from '../../Services/LostItemService';
import {getFoundItemsByLostItem} from '../../Services/FoundItemService';
