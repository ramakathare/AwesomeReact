using AwesomeReact.Entities.Map;
using AwesomeReact.Entities.Models;
using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AwesomeReact.Entities
{
    
    public partial class AwesomeReactContext : DataContext
    {
        static AwesomeReactContext()
        {
            
            Database.SetInitializer<AwesomeReactContext>(new CreateDatabaseIfNotExists<AwesomeReactContext>());
        }

        public AwesomeReactContext()
            : base("Name=AwesomeReactConnection")
        {
            base.Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Configurations.Add(new NoteMap());
        }
    }
}
