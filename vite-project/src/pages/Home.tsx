//export means that the function can be imported and used in other files. 
// In this case, the `Home` function is being exported so that it can be used in other parts of the application, such as in routing or rendering components.

//default means that this is the default export of the file.
//When a file has a default export, it can be imported without using curly braces and can be given any name during import. 
// In this case, `Home` is the default export of the file, so when importing it in another file, you can do something like `import Home from './Home'` without needing to use curly braces.
import { useAuth } from"../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Home() {

  const { user, isLoading } = useAuth();

    if (user && !isLoading) {
      return <Navigate to="/profile" replace />;
    }
    return <div>
              <h1 className="text-5xl text-accent">
                Home Page
              </h1>
           </div>;
    
}