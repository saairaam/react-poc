using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace backend.Models
{
    [Table(("Student"))]
    public class Student
    {
        [Column("id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column("rollNo")]
        [Required]
        public int RollNo { get; set; }
        [Column("name")]
        [MaybeNull]
        public string Name { get; set; }
        [Column("email")]
        [MaybeNull]
        public string Email { get; set; }
    }
}