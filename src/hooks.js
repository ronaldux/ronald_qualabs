export const useUsers = () => {
  //obtener todos los archivos json y unirlos para crear lista de usuarios
  const jsonFiles = require.context("./data", true, /\.(json)$/);
  return jsonFiles.keys().map((key) => {
    return { ...jsonFiles(key), id: key };
  });
}

export const useModules = () => {
    //identificar y obtener los modulos en base a todos los
    const userList = useUsers();

    const listaModulos = userList
    .map((user) => {
      return Object.keys(user.provider);
    })
    .flat();

  return [...new Set(listaModulos)];
}


export const useGetObject = () => {
    const userList = useUsers();
    const modulesList = useModules();

  //funcion que obtiene los usuarios por modulo y type

  const getUsersByType = (module, type) => {
    const finalCountItems = userList.filter(
      (item) => item.provider[module] === type
    );
    return finalCountItems.map((item) => item.id);
  };

  //obtiene los types por mudulo y los usuarios por cada uno

  const getTypesModule = (module) => {
    const typeList = [
      ...new Set(userList.map((user) => user.provider[module])),
    ];
    const objectType = {};
    typeList.forEach((type) => {
      objectType[type] = getUsersByType(module, type);
    });
    return objectType;
  };

  //al ejecutar la web genera el objeto con el orden y datos

  const finalObject = {};
  modulesList.forEach((item) => {
    finalObject[item] = getTypesModule(item);
  });

  return finalObject;
};
