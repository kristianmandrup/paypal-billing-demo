module.exports = function(address)
  return {
    "line1": address["line1"] ? address["line1"]:"",
    "line2": address["line2"] ? address["line2"]:"",
    "city": address["city"] ? address["city"]:"",
    "state": address["state"] ? address["state"]:"",
    "postal_code": address["postal_code"] ? address["postal_code"]:"",
    "country_code": address["country_code"] ? address["country_code"]:""
  }
}
