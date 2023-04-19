case1: {
		$0: {
			data: {
				result: "{\"gas_price\":\"100000000\"}",
				error: null,
				id: "1"
			},
			error?: _|_,
		}
},
case2: {
		$0: {
			data: {
				result: =~ "(\\\"gas_price\\\":\\\"100000000\\\").*(\\\"height\\\":93019381)|(\\\"height\\\":93019381).*(\\\"gas_price\\\":\\\"100000000\\\")"
				error: null,
				id: "2"
			},
			error?: _|_,
		}
},
case3: {
		$0: {
			data: {
				result: "\"0x96\"",
				error: null,
				id: "3"
			},
			error?: _|_,
		}
},
case4: {
		$0: {
			data: {
				result: null,
				error: {
					code: -32700,
					message: "Parse error",
					data: "\"Failed parsing args: invalid type: null, expected a tuple of size 1\""
				}
				id: "4"
			},
			error?: _|_,
		}
}

