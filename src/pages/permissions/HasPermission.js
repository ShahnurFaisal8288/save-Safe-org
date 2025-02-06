import axios from 'axios';
import React, { useEffect, useState, } from 'react'
import axiosInstance from '../../components/axiosInstance';

const HasPermission = ({ page, permission, children }) => {
    const [permissions, setPermissions] = useState([]);
    // Retrieve the item with key "id" from localStorage
    const id = localStorage.getItem("id");


    useEffect(() => {
        const fetchPermissions = async () => {
          try {
            const response = await axiosInstance.get(`permission/page/${id}`);
            if (response.data.success) {
              setPermissions(response.data.permissions);
              console.log("setPermissions",response.data.permissions)
            }
          } catch (error) {
            console.error('Error fetching permissions:', error);
          }
        };
    
        fetchPermissions();
      }, [id]);
      const pagePermissions = permissions.find(p => p.page_url === page);
      // Check if the permission exists
      const hasPermission = pagePermissions && pagePermissions.permissions.includes(permission);
    
      return hasPermission ? children : null;
};

export default HasPermission
