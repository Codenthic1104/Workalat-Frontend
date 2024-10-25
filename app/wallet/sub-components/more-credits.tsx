import ArrowForward from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface row {
  id: number;
  points: string;
  price: string;
}

const rows: row[] = [
  createData("10 Points", "£8. + VAT"),
  createData("20 Points", "£15.2 + VAT"),
  createData("30 Points", "£30 + VAT"),
  createData("50 Points", "£60 + VAT"),
];

function createData(points: string, price: string): row {
  const id = Math.random() * 100;

  return { id, points, price };
}

export default function MoreCredits(
    { openBuyModal, data, buy, payGoValue }
) : any  {
  
  const router = useRouter()
  
  return ( 
    <Box>
      {
            !payGoValue &&  
            (
              <>
              
                  <Table className="[&_*]:!font-mono border !rounded-lg md:[&_*]:!text-lg shadow-md">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Points</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      
                      {data?.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell align="center">{row.point} Points</TableCell>
                          <TableCell align="center">£{row.amount} + VAT</TableCell>
                          <TableCell align="center">
                            <Button variant="contained" onClick={()=>{buy({amount :row.amount, points : row.point })}} >Buy Points</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button className="text-main font-bold text-center w-full md:text-lg mt-2"
                    onClick={() => router.push('/contact')}
                  >
                    Buy more credits
                    <ArrowForward className="w-5 ml-2" />
                  </Button>
              
              </>
            )
      }

    </Box>
  );
}
