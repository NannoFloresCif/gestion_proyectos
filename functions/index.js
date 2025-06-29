import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Inicializamos el SDK de Admin para que la función tenga permisos para acceder a Firestore.
admin.initializeApp();

// Creamos nuestra función "onCall". Este tipo de función es segura y fácil de llamar desde el cliente.
export const deleteProject = functions.https.onCall(async (data, context) => {
  // 'data' contiene los datos que enviamos desde nuestra app de React.
  const projectId = data.projectId;

  // Una buena práctica es validar que recibimos los datos esperados.
  if (!projectId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "La función debe ser llamada con el argumento 'projectId'."
    );
  }

  // En un futuro, aquí podríamos verificar si el usuario está autenticado
  // y si tiene permisos para borrar este proyecto. Ej: if (!context.auth) { ... }

  try {
    // Usamos el SDK de Admin para eliminar el documento en la colección "projects"
    // que coincida con el projectId que recibimos.
    await admin.firestore().collection("projects").doc(projectId).delete();

    // Devolvemos un mensaje de éxito.
    return { status: "success", message: `Proyecto ${projectId} eliminado.` };
  } catch (error) {
    // Si algo sale mal, registramos el error y lanzamos una excepción.
    console.error("Error al eliminar el proyecto:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Ocurrió un error al eliminar el proyecto."
    );
  }
});
