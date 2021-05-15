buf = new Buffer.alloc(256);
len = buf.write("Simple Easy Learning");
console.log("Octets written : " + len);

alpha_buf = new Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
    alpha_buf[i] = i + 97;
}

console.log(alpha_buf.toString('ascii'));
console.log(alpha_buf.toString('ascii', 0, 5));
console.log(alpha_buf.toString('utf8', 0, 5));
console.log(alpha_buf.toString(undefined, 0, 5));

var json = buf.toJSON(buf);
console.log(json);

var buffer1 = new Buffer.from('TutorialsPoint ');
var buffer2 = new Buffer.from('Simpe Easy Learning');
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer 3 content: " + buffer3.toString());

var buffer_cmp1 = new Buffer.from('ABC');
var buffer_cmp2 = new Buffer.from('ABCD');
var result = buffer_cmp1.compare(buffer_cmp2);

if (result < 0) {
    console.log(buffer_cmp1 + " comes before " + buffer_cmp2);
} else if (result === 0) {
    console.log(buffer_cmp1 + " is same as " + buffer_cmp2);
} else {
    console.log(buffer_cmp1 + " comes after " + buffer_cmp2);
}

var buffer_slice = new Buffer.from('TutorialsPoint');

//slicing a buffer
var buffer_slice_2 = buffer1.slice(0, 9);
console.log("buffer2 content: " + buffer_slice_2.toString());

// length of the buffer
console.log("buffer length: " + buffer_slice.length);
