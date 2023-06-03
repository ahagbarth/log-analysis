import path from "path";
import fs from "fs";
import { Transform } from "stream";

const getLocalData = async ({
  fileName,
}: IGetLocalData): Promise<string> => {
  const filePath: string = path.join(process.cwd(), "src/data/" + fileName);
  const fileStream = fs.createReadStream(filePath, "utf-8");
  const transformedData = fs.createWriteStream("./transformedData.json");

  let processedData: any[] = [];

  const parseData = new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      processedData = [...processedData, ...processData({ data: chunk })];
      callback();
    },
  });

  fileStream
    .on("error", (e) => console.error(`Error reading file: ${e}`))
    .pipe(parseData)
    .on("error", (e) => console.error(`Error processing file: ${e}`))
    .on("finish", () => {
      transformedData.write(JSON.stringify(processedData, null, 2));
      transformedData.end();
      console.log("processed");
    })
    .on("error", (e) => console.error(`Error writing file: ${e}`));

  return "hello";
};

const processData = ({ data }: IProcessData): IProcessLineResponse[] =>
  data.split("\n").map((line: string) => processLine({ line }));

const processLine = ({ line }: IProcessLine): IProcessLineResponse => {
  const [host, date, method, url, protocol, code, bytes] = line.split(" ");
  const newCode = parseInt(code);
  const newBytes = parseInt(bytes);
  return {
    host: host === "-" ? null : host,
    datetime: parseDate({ date }),
    request: parseRequest({ method, url, protocol }),
    response_code: newCode >= 100 && newCode <= 599 ? newCode : null,
    document_size: newBytes,
  };
};

const parseDate = ({ date }: IParseDate): IParseDateResponse => {
  const matches = date
    ? date.match(/\[(\d{2}):(\d{2}):(\d{2}):(\d{2})\]/)
    : null;

  if (!matches) {
    return {
      day: null,
      hour: null,
      minute: null,
      second: null,
    };
  }

  const [, day, hour, minute, second] = matches;

  return {
    day: parseInt(day),
    hour: parseInt(hour),
    minute: parseInt(minute),
    second: parseInt(second),
  };
};

const parseRequest = ({
  method,
  url,
  protocol,
}: IParseRequest): IParseRequestResponse => {
  const possibleMethods = [
    "GET",
    "POST",
    "DELETE",
    "HEAD",
    "PUT",
    "CONNECT",
    "OPTIONS",
    "TRACE",
    "PATCH",
  ];
  const newMethod = method ? method.slice(1) : "";
  const splitProtocol = protocol
    ? protocol.slice(0, protocol.length - 1).split("/")
    : null;
  const protocolName = splitProtocol ? splitProtocol[0] : null;
  const protocolVersion = splitProtocol ? splitProtocol[1] : null;

  return {
    method: possibleMethods.includes(newMethod) ? newMethod : null,
    url,
    protocol: protocolName,
    protocol_version: protocolVersion,
  };
};

export default getLocalData({ fileName: "epa-http.txt" });
