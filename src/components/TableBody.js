import '../App.css';

const TableBody = ({ tableData, columns }) => {
    
    return (
     <tbody className="Table-elements text-gray-300">
      {tableData.map((data) => {
       return (
        <tr key={data.id}>
            {columns.map(({ accessor }) => {
            return (
            <td className='text-center'>
                {accessor === 'name' ? 
                    <a href={`/game/${data[accessor].replace(/®|™|!|’/g, "")}`}> {data[accessor]} </a> 
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