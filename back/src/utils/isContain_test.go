package utils

import "testing"

func TestIsIntContain(t *testing.T) {
	type args struct {
		arr []int
		n   int
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		// TODO: Add test cases.
		{
			name: "should return true",
			args: args{
				arr: []int{1, 2, 3},
				n:   1,
			},
			want: true,
		},
		{
			name: "should return false",
			args: args{
				arr: []int{1, 2, 3},
				n:   0,
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := IsIntContain(tt.args.arr, tt.args.n); got != tt.want {
				t.Errorf("IsIntContain() = %v, want %v", got, tt.want)
			}
		})
	}
}
