//описание  тoчки
export default class PointsModel {
  constructor(service){
    this.service = service;
    this.points = this.service.getPoints();
  }

  //получение точки
  get(){
    return this.points;
  }

}
