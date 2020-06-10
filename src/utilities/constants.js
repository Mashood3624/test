//http://52.226.76.92:90/api/v1/
//http://192.168.1.102:1000
class constants {
  static getConstant() {
    const CBM = {
      url: 'http://52.226.76.92:90',  //Production:'http://103.31.81.25:2500','http://192.168.15.5:4000','http://192.168.70.107:4000' Testing:'http://192.168.1.78:4000' Noshan:'http://192.168.1.97:4000' Aamir:'http://192.168.1.169:4000'
      reportUrl: 'http://sina_win_server/Sina', //Production:'http://sina_win_server/Sina',http://admin-pc:88/ReportServer Testing:'http://finsrv01/ReportServer_SQL2014'
      reportPath: '/SINA_Web',  //Production:'/SINA_Web' ,/PAF_HIMS
      SecretKey: 'CBMFin2020',
      StatusCodeNew: '0',
      StatusCodeSubmit: '1',
      StatusCodeApprove: '2',
      StatusCodeClosed: '10',
      StatusPending: 'Pending',
      StatusSubmitted: 'Submitted',
      StatusApprove: 'Approved',
      StatusPosted: 'POSTED',
      StatusUnPosted: 'Un-Posted',



    };


    return CBM;
  }
}

export default (constants);