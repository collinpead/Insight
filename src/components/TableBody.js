import '../App.css';
import config from '../config.json'

const TableBody = ({ tableData, columns }) => {
    console.log(tableData)
    return (
     <tbody className="Table-elements text-gray-300">
      {tableData.map((data) => {
       return (
        <tr key={data.id}>
            {columns.map(({ accessor }) => {
            return (
            <td className='text-center'>
                {accessor === 'name' ? 
                    <a href={`/game/${data[accessor]}/7/`}> {data[accessor]} </a> 
                    : 
                    <a> {data[accessor]} </a> }
            </td>
            );
        })}
        </tr>
       );
      })}
     </tbody>
    );
   };
   
   export default TableBody;