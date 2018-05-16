- [class: SecurityDetails](#class-securitydetails)
  * [securityDetails.issuer()](#securitydetailsissuer)
  * [securityDetails.protocol()](#securitydetailsprotocol)
  * [securityDetails.subjectName()](#securitydetailssubjectname)
  * [securityDetails.validFrom()](#securitydetailsvalidfrom)
  * [securityDetails.validTo()](#securitydetailsvalidto)

### class: SecurityDetails

[SecurityDetails] class represents responses which are received by page.

#### securityDetails.issuer()
- returns: <[string]> A string with the name of issuer of the certificate.

#### securityDetails.protocol()
- returns: <[string]> String with the security protocol, eg. "TLS 1.2".

#### securityDetails.subjectName()
- returns: <[string]> Name of the subject to which the certificate was issued to.

#### securityDetails.validFrom()
- returns: <[number]> [UnixTime] stating the start of validity of the certificate.

#### securityDetails.validTo()
- returns: <[number]> [UnixTime] stating the end of validity of the certificate.
