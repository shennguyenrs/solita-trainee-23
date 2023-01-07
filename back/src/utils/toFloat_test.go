package utils

import "testing"

func TestToFloat(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name  string
		args  args
		wantN float64
	}{
		// TODO: Add test cases.
    {
      name: "should return correct value 1",
      args: args{
        s: "1",
      },
      wantN: 1.0,
    },
    {
      name: "should return can not convert value -1",
      args: args{
        s: "s",
      },
      wantN: -1,
    },
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotN := ToFloat(tt.args.s); gotN != tt.wantN {
				t.Errorf("ToFloat() = %v, want %v", gotN, tt.wantN)
			}
		})
	}
}
