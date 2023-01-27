import '../App.css';

const TableBody = ({ tableData, columns, tableType }) => {
    return (
     <tbody className="Table-elements text-gray-300">
      {tableData.map((data) => {
       return (
        <tr key={data.id}>
            {columns.map(({ accessor }) => {
            return (
            <td className='text-center'>
                {accessor === 'name' ? 
                <a href={`/${data[accessor].replace(/®|™|!|’/g, "")}`}> {data[accessor]} </a> : 
                <div> {data[accessor]} </div> }
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