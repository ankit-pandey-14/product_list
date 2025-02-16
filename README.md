# Product Management
A react application that allows user to login and view the product list and also a detailed description of individual product.


## Run the Application Locally

Clone the respective repo from below link.

```http
  https://github.com/ankit-pandey-14/product_list.git
```

Then, open Terminal and hit the below commands.
- Make sure `node js` and `npm` is installed

```http
  cd ./products/
```

```http
  npm install
```

```http
  npm run dev
```

- Use the below credentials to login

`UserName : testuser@nutritap.in`
`Password : Nutritap123`


## Environment Variables

Create the below file in the root directory
```
.env
```
and add the below environment variable to run the application.

`VITE_BASE_API_URL=https://kiosk-backend.nutritap.in/api/`


## Appendix

- This application involves use of [Ant Design](https://ant.design/) for UI support.

- [Redux Toolkit](https://redux-toolkit.js.org/) to manage state

- [Axios](https://axios-http.com/docs/intro) for managing api calls

- Custom Hooks have been used to discard repetetive logics.

- HOC ( Higher Order Components ) have been used to achieve some functionalities.


## Authors

- [Ankit Pandey](https://github.com/ankit-pandey-14)

