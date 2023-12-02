import axios from 'axios';
import { baseUrl } from './Constant';
import { useEffect } from 'react';

const GetUserInfo = (userid, setData) => {
    const typeUser = window.localStorage.getItem('typeUser');
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeUser === 'Admin') {
                    const res = await axios.get(`${baseUrl}admins/${userid}`);
                    setData(res.data.data);
                } else if (typeUser === 'User') {
                    const res = await axios.get(`${baseUrl}users/${userid}`);
                    setData(res.data.data);
                }
                // Assuming the user data is in the response's data property
            } catch (err) {
                console.error(err);
            }
        };
        fetchData()
    }, []);

};

export default GetUserInfo;