export function catchError(action) {
    return async (req, res, next) => {
      try {
        await action(req, res, next)
      }
  
      catch(e) {
        next(e)
      }
    }
  }