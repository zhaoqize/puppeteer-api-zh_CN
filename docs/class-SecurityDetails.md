- [class: SecurityDetails](#class-securitydetails)
  * [securityDetails.issuer()](#securitydetailsissuer)
  * [securityDetails.protocol()](#securitydetailsprotocol)
  * [securityDetails.subjectName()](#securitydetailssubjectname)
  * [securityDetails.validFrom()](#securitydetailsvalidfrom)
  * [securityDetails.validTo()](#securitydetailsvalidto)

### class: SecurityDetails

[SecurityDetails] 类表示由页面接收的响应。

#### securityDetails.issuer()
- returns: <[string]> 具有证书颁发者名称的字符串。

#### securityDetails.protocol()
- returns: <[string]> 带安全协议的字符串，例如："TLS 1.2"。

#### securityDetails.subjectName()
- returns: <[string]> 证书颁发给的主体的名称。

#### securityDetails.validFrom()
- returns: <[number]> [UnixTime] 说明证书有效期的开始。

#### securityDetails.validTo()
- returns: <[number]> [UnixTime] 说明证书的有效期结束。
