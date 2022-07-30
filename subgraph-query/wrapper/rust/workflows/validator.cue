package e2e
import "encoding/json"

#Domain: {
  id: =~"^0x[A-Fa-f0-9]{64}$",
  name: string | null,
  labelName: string | null,
  labelhash: =~"^0x[A-Fa-f0-9]{64}$" | null,
}

cases: {
  $0: {
    data: string,
    parsedData: json.Unmarshal(data),
    parsedData: {
      domains: [...#Domain]
    }
    error?: _|_, // Never fails
  }
}