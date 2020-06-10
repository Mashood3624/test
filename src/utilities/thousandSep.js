

class ThousandSeparator {
     
    thousandSeparator(num) {
        if(num==='NaN'){
            num='0.00'
        }
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return num_parts.join(".");
  }

      
    
    ReplaceTS(num) {
        return num.toString().replace(/,/g, '');
    }

  }
  
  export default (ThousandSeparator);