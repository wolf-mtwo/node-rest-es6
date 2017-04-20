export class Service {

  static home(req, res, next) {
    res.json({
      vesion: '0.0.0'
    });
  }
}
